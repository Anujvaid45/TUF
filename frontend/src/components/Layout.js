import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return ( 
        <div>
            <Header/>
            <main style={{padding: '20px',minHeight:'80vh'}}>
                {children}
                </main>
            <Footer/>
        </div>
    );
}


 
export default Layout;