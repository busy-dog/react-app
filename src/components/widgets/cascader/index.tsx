// import { useMemo } from 'react';
// import type {
//   DefaultOptionType,
//   FieldNames,
//   InternalValueType,
//   ShowCheckedStrategy,
// } from 'rc-cascader/es/Cascader';
// import useDisplayValues from 'rc-cascader/es/hooks/useDisplayValues';
// import useMissingValues from 'rc-cascader/es/hooks/useMissingValues';
// import useOptions from 'rc-cascader/es/hooks/useOptions';
// import useValues from 'rc-cascader/es/hooks/useValues';
// import {
//   fillFieldNames,
//   toPathKeys,
//   toRawValues,
// } from 'rc-cascader/es/utils/commonUtil';
// import { formatStrategyValues } from 'rc-cascader/es/utils/treeUtil';

// import { parse } from '@busymango/utils';

// export interface ICascaderProps {
//   names?: FieldNames;
//   multiple?: boolean;
//   value?: InternalValueType;
//   options?: DefaultOptionType[];
//   showCheckedStrategy?: ShowCheckedStrategy;
//   render?: (label: string[], options?: DefaultOptionType[]) => React.ReactNode;
// }

// const ICascaderView: React.FC<ICascaderProps> = (props) => {
//   const {
//     value,
//     names,
//     options,
//     multiple = false,
//     showCheckedStrategy,
//     render,
//   } = props;

//   const raws = toRawValues(value);

//   const iString = JSON.stringify(names);

//   const iNames = useMemo(
//     () => fillFieldNames(parse.json<FieldNames>(iString)),
//     [iString]
//   );

//   const [iOptions, iPathKeyEntities, iValueByKeyPath] = useOptions(
//     iNames,
//     options
//   );

//   const iMissingValues = useMissingValues(iOptions, iNames);

//   const [checkeds, _, missings] = useValues(
//     multiple,
//     raws,
//     iPathKeyEntities,
//     iValueByKeyPath,
//     iMissingValues
//   );

//   const deduplicated = useMemo(() => {
//     const checkedKeys = toPathKeys(checkeds);
//     const deduplicateKeys = formatStrategyValues(
//       checkedKeys,
//       iPathKeyEntities,
//       showCheckedStrategy
//     );

//     return [...missings, ...iValueByKeyPath(deduplicateKeys)];
//   }, [
//     checkeds,
//     missings,
//     showCheckedStrategy,
//     iPathKeyEntities,
//     iValueByKeyPath,
//   ]);

//   const displays = useDisplayValues(
//     deduplicated,
//     iOptions,
//     iNames,
//     multiple,
//     render
//   );

//   return displays?.map(({ label }) => label)?.join('、');
// };

// export const ICascader: React.FC = () => {
//   return <ICascaderView />;
// };
