import type { ICheckboxProps, ICheckIconRender } from '@/components';
import { ICheckbox, IFlex } from '@/components';

import FavoriteFlatSVG from '@/icons/actions/favorite.flat.svg?react';
import FavoriteSVG from '@/icons/actions/favorite.svg?react';

const icon: ICheckIconRender = (_, { checked }) =>
  checked ? (
    <FavoriteFlatSVG style={{ color: 'rgb(var(--rosein-color-600) / 1)' }} />
  ) : (
    <FavoriteSVG style={{ color: 'rgb(var(--rosein-color-600) / 1)' }} />
  );

const IFavorite: React.FC<ICheckboxProps> = (props) => (
  <ICheckbox render={{ icon }} {...props} />
);

const App: React.FC = () => (
  <IFlex gap={16}>
    <IFavorite label="Favorite" />
  </IFlex>
);

export default App;
