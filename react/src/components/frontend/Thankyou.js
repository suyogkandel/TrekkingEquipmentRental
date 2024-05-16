import React from 'react';
import Helmet from '../../components/Helmet/Helmet' 

function Thankyou() {
    return  (
        <div>
         <Helmet title='Thank You!!' />

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Thank you</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div class="col-md-12">
                        <div className="card text-center p-5">
                            <h4>Thanks for purchasing with us!!</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Thankyou;
