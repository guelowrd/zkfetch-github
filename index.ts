import express, { Request, Response } from 'express';
import { ReclaimClient } from '@reclaimprotocol/zk-fetch';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the ReclaimClient with the app id and app secret (you can get these from the Reclaim dashboard - https://dev.reclaimprotocol.org/) 
const reclaimClient = new ReclaimClient(process.env.APP_ID!, process.env.APP_SECRET!);
const app = express();


app.get('/', (_: Request, res: Response) => {
    res.send('gm gm! api is running');
});

app.get('/generateProof', async (_: Request, res: Response) => {
    try{
        // URL to fetch the data from 
        const url = process.env.GH_PRIVATE_URL!;
        const publicOptions = {
          method: 'GET', 
          headers: {
            accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        };
        const privateOptions = {
          headers: {
              Authorization: "Bearer " + process.env.GH_API_KEY!
          }
        };
        /* 
        * Fetch the data from the API and generate a proof for the response. 
        */ 
        const proof = await reclaimClient.zkFetch(url, publicOptions, privateOptions);
      
        if(!proof) {
          return res.status(400).send('Failed to generate proof');
        }
        // Verify the proof
        const isValid = await Reclaim.verifySignedProof(proof);
        if(!isValid) {
          return res.status(400).send('Proof is invalid');
        }
        // Transform the proof data to be used on-chain (for the contract)
         const proofData = await Reclaim.transformForOnchain(proof);
        return res.status(200).json({ transformedProof: proofData, proof });
    }
    catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
})



const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});