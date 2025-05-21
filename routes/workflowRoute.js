import {Router} from 'express';

const workflowRoute = Router();

workflowRoute.get('/', (req, res) => {
    res.send('Workflow route');
});


export default workflowRoute;
// This code defines a simple Express route for handling workflow-related requests.