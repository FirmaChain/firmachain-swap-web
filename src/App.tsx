import { Main } from '@/pages';
import { BrowserRouter } from 'react-router-dom';

import './default.css';

const App = () => {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
};

export default App;
