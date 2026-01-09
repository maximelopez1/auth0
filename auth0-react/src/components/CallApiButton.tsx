import { useAuth0 } from "@auth0/auth0-react";

function CallApiButton() {
    const { getAccessTokenSilently } = useAuth0();

    const callPublicApi = async () => {
        const response = await fetch("http://localhost:3000/api/public");
        const data = await response.json();
        console.log(data);
    }


    const callPrivateApi = async () => {
        try {
        // Récupérer le token depuis Auth0
        const token = await getAccessTokenSilently({
            authorizationParams: {
            audience: "https://test-node-api",
            },
        });

        //console.log(token);

        // Appeler l’API privée
        const response = await fetch("http://localhost:3000/api/private", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div style={{ display: 'flex', gap: 20}}>
            <button className="button" onClick={callPublicApi}>Public API</button>
            <button className="button" onClick={callPrivateApi}>Private API</button>
        </div> 
    );
}

export default CallApiButton;
