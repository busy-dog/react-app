import { configure } from 'docs/widgets';

import { sleep } from '@busymango/utils';
import { useMutation } from '@tanstack/react-query';

import { IButton, IFlex, ISignLine } from '@/components';

const App: React.FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (_: React.UIEvent) => {
      await sleep(3000);
    },
  });

  return (
    <IFlex wrap gap={8}>
      <IButton isLoading variant="filled" onClick={mutate} />
      <IButton disabled isLoading variant="filled" onClick={mutate}>
        加载中
      </IButton>
      <IButton isLoading variant="bordered" onClick={mutate}>
        加载中
      </IButton>
      <IButton
        debounce
        icon={<ISignLine ring type="informer" />}
        isLoading={isPending}
        type="submit"
        variant="filled"
        onClick={mutate}
      >
        提交
      </IButton>
      <IButton disabled={isPending} variant="bordered">
        重置
      </IButton>
    </IFlex>
  );
};

export default configure(App);
