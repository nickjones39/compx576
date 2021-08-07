import React, { useEffect, useState } from 'react';

import AssetsList from '../components/AssetsList';
//import ErrorModal from ''

const Assets = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedAssets, setLoadedAssets] = useState();
    
    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/all-assets/')

                const responseData = await Response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedAssets(responseData)
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }

            setIsLoading(false)
            
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    };
    
    // const ASSETS = [{}];  // fetch assets from mongodb here

    return (
        //<React.Fragment>
            <AssetsList assets={loadedAssets} />
        //</React.Fragment>
    );
        
}

export default Assets;