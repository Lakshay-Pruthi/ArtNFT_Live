import LOGO from '../assets/LOGO.png'
import { useContext, useState } from 'react';
import { MainContext } from '../Pages/Main';
import Web3 from 'web3';
import { Link } from 'react-router-dom';


function Navbar() {

    const { setWeb3, userAccount } = useContext(MainContext);

    function connectToWallet() {
        const provider = window.ethereum;

        if (provider) {
            setWeb3(new Web3(provider));
            window.ethereum.enable();
        }
    }


    return (
        <>

            <nav>
                <Link to='/ArtNFT_Live/'>

                    <div id='navBox1'>
                        <img src={LOGO} alt="" />
                        <h2>GENERATOR</h2>
                    </div>
                </Link>

                <div>
                    <button>Account : {userAccount}</button>
                    <button><Link to='MyNFT'>My NFT's</Link></button>
                    <button onClick={connectToWallet}>connect</button>
                </div>
            </nav>
        </>
    )
}
export default Navbar;
