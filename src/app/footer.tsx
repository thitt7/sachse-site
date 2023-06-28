import React from 'react';
import "../styles/_footer.scss";


export default async function Footer () {

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-6 logoContainer">
                            Logo
                        </div>
                        <div className="col-6">
                            Powered by Lorem Ipsum
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
