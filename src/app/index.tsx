import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Progress from './game/Progress';

const App = () => {
	return (
		<div className='flex flex-col h-screen min-w-xs'>
			<div className='flex flex-col md:flex-row grow'>
				<Header />
				<Main />
			</div>
			<Progress />
			<Footer />
		</div>
	);
};
export default App;
