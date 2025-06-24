import { Main } from '@/pages';
import { BrowserRouter } from 'react-router';

import './default.css';

const App = () => {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
};

export default App;
