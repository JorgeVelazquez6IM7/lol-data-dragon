import { AppRouter } from './router/AppRouter';
import { LgProvider } from './context/LgContext';

function DragonApp() {

  return (
    <LgProvider>
        <AppRouter />
    </LgProvider>
  )
}

export default DragonApp