import { forwardRef, useEffect, useRef, useState } from 'react';
import { isString } from 'remeda';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

import { useMemoFunc, useToggle } from '@/hooks';

import { IButton } from '../button';
import { IFlex } from '../flex';
import { MenuProvider, useMenuContext } from './hooks';
import type {
  MenuItemProps,
  MenuItemRef,
  MenuTreeProps,
  MenuTreeRef,
} from './models';

export const MenuItem = forwardRef<MenuItemRef, MenuItemProps>(
  function MenuItem(props, iRef) {
    const { label, disabled, onClick, ...others } = props;

    const { events } = useFloatingTree() ?? {};

    const { ref, index } = useListItem();

    const { iItemProps, activeIndex } = useMenuContext();

    const isActive = index === activeIndex;

    const handleClick = useMemoFunc(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        events?.emit('click');
      }
    );

    return (
      <IButton
        // ref={useMergeRefs([ref, iRef])}
        disabled={disabled}
        role="menuitem"
        variant="text"
        {...others}
        {...iItemProps({
          onClick: handleClick,
        })}
      >
        {label}
      </IButton>
    );
  }
);

export const MenuTree = forwardRef<MenuTreeRef, MenuTreeProps>(
  function MenuTree(props, iRef) {
    const { children, render } = props;

    const parent = useMenuContext();

    const [open, { toggle }] = useToggle();

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elements = useRef<Array<HTMLButtonElement | null>>([]);
    const labels = useRef<Array<string | null>>([]);

    const tree = useFloatingTree();

    const nodeId = useFloatingNodeId();

    const parentId = useFloatingParentNodeId();

    const item = useListItem();

    const isNested = parentId != null;

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
      nodeId,
      open: open,
      onOpenChange: toggle,
      placement: isNested ? 'right-start' : 'bottom-start',
      middleware: [
        offset({
          mainAxis: isNested ? 0 : 4,
          alignmentAxis: isNested ? -4 : 0,
        }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(context, {
      event: 'mousedown',
      toggle: !isNested,
      ignoreMouse: isNested,
    });

    const role = useRole(context, { role: 'menu' });
    const dismiss = useDismiss(context, { bubbles: true });
    const listNavigation = useListNavigation(context, {
      listRef: elements,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
      listRef: labels,
      onMatch: open ? setActiveIndex : undefined,
      activeIndex,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

    useEffect(() => {
      if (!tree) return;

      function handleTreeClick() {
        toggle(false);
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          toggle(false);
        }
      }

      tree.events.on('click', handleTreeClick);
      tree.events.on('menuopen', onSubMenuOpen);

      return () => {
        tree.events.off('click', handleTreeClick);
        tree.events.off('menuopen', onSubMenuOpen);
      };
    }, [tree, nodeId, parentId, toggle]);

    useEffect(() => {
      if (open && tree) {
        tree.events.emit('menuopen', { parentId, nodeId });
      }
    }, [tree, open, nodeId, parentId]);

    return (
      <FloatingNode id={nodeId}>
        <button
          ref={useMergeRefs([refs.setReference, item.ref, iRef])}
          className={isNested ? 'MenuItem' : 'RootMenu'}
          data-nested={isNested ? '' : undefined}
          data-open={open ? '' : undefined}
          role={isNested ? 'menuitem' : undefined}
          {...getReferenceProps(parent.iItemProps(props))}
        >
          {render?.reference?.()}
          {render?.marked?.({ isNested })}
          {/* {isNested && (
            <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
              ▶
            </span>
          )} */}
        </button>
        <MenuProvider
          value={{
            open,
            activeIndex,
            setActiveIndex,
            iItemProps: getItemProps,
          }}
        >
          <FloatingList elementsRef={elements} labelsRef={labels}>
            {open && (
              <FloatingPortal>
                <FloatingFocusManager
                  context={context}
                  initialFocus={isNested ? -1 : 0}
                  modal={false}
                  returnFocus={!isNested}
                >
                  <div
                    ref={refs.setFloating}
                    className="Menu"
                    style={floatingStyles}
                    {...getFloatingProps()}
                  >
                    {children}
                  </div>
                </FloatingFocusManager>
              </FloatingPortal>
            )}
          </FloatingList>
        </MenuProvider>
      </FloatingNode>
    );
  }
);

export interface MenuWrapProps {
  items?: MenuItemProps[];
  children?: () => React.ReactNode;
}

export const MenuWrap = forwardRef<HTMLButtonElement, MenuWrapProps>(
  function MenuWrap(props, ref) {
    const { items, children } = props;

    const parentId = useFloatingParentNodeId();

    const iRender = useMemoFunc(() => (
      <MenuTree ref={ref} render={{ reference: children }}>
        <IFlex vertical>
          {items?.map((e) => <MenuItem key={e.value?.toString()} {...e} />)}
        </IFlex>
      </MenuTree>
    ));

    return isString(parentId) ? (
      iRender()
    ) : (
      <FloatingTree>{iRender()}</FloatingTree>
    );
  }
);
