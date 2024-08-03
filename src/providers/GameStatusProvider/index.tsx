import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback, useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';

type Props = {
  children: ReactNode;
};

type ToggleGameArgs = {
  status: boolean;
};

type GameStatusInitialState = {
  isPlaying: boolean;
  handleToggleIsPlaying: (args: ToggleGameArgs) => void;
};

const GameStatusContext = createContext<GameStatusInitialState>({} as GameStatusInitialState);

const GameStatusContextProvider: FC<Props> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isAuthenticated } = useRecoilValue(authState);
  const { route, query } = useRouter();

  const handleToggleIsPlaying = useCallback(
    (args: ToggleGameArgs) => {
      const { status } = args;
      if (status) {
        Cookies.set('CasinoGame', 'isPlaying', { expires: 0.5 }); // Expires in 12 hours
      } else {
        Cookies.remove('CasinoGame');
      }
      setIsPlaying(status);
    },
    [setIsPlaying]
  );

  useEffect(() => {
    // Load isPlaying status from cookies on initial render
    const storedIsPlaying = Cookies.get('CasinoGame');
    // Access dynamic route parameters
    const { gameId, productName } = query;
    const isCasinoRoute = route.includes('/casino/game') && gameId && productName;

    if (storedIsPlaying && isCasinoRoute && isAuthenticated) {
      handleToggleIsPlaying({
        status: true
      });
    } else {
      handleToggleIsPlaying({
        status: false
      });
    }
  }, [handleToggleIsPlaying, isAuthenticated, route, query]);

  return (
    <GameStatusContext.Provider value={{ isPlaying, handleToggleIsPlaying }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatusContext = () => useContext(GameStatusContext);
export default GameStatusContextProvider;
