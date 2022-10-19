import { Home } from './Home';
import { Cadastro } from './Cadastro';
import { Login } from './Login';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

export function AppRouter() {

    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );


}