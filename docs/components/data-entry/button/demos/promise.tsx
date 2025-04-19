import { configure } from 'docs/widgets';

import { useMutation } from '@tanstack/react-query';

import { IButton, IFlex, ISignLine } from '@/components';
import { sleep } from '@/utils';

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
        icon={<ISignLine ring type="info" />}
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
