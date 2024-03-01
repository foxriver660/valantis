import { SWRConfig } from 'swr'
import { GlobalProvider } from './context'
import { ProductsPage } from './pages'

function App() {
	return (
		<>
			<SWRConfig
				value={{
					errorRetryInterval: 0,
					loadingTimeout: 3000,
				}}
			>
				<GlobalProvider>
					<ProductsPage />
				</GlobalProvider>
			</SWRConfig>
		</>
	)
}

export default App
