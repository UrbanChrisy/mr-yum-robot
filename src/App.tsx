import { FunctionComponent } from "react";
import GameModeService from "./services/game-mode.service";
import GameScreen from "./screens/game.screen";

const App: FunctionComponent = () => {

	const gameModeState = GameModeService.useProvidedState()

	return (
		<GameModeService.Provider value={gameModeState}>
			<GameScreen />
		</GameModeService.Provider>
	)
}

export default App
