import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <div>
         <footer className="row fixed-bottom">
            <div className="col-md-12 d-flex ending justify-content-center">
                <span className="h5 text-light">&copy; All rights reserved </span>
            </div>
        </footer>
            </div>
        );
    }
}
export default Footer;