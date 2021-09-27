import express, { Application, NextFunction, Request, Response, Router } from "express";
const app: Application = express();
const port: string = '8080';


app.get('/', (req, res) => { 
    res.send({ message: 'Server is active', timestamp: new Date() }); 
});

try {
    app.listen(port, (): void => {
        console.log(`Server is active at http://localhost:${port}`);
    });
} catch (error: any) {
    console.error(`An error occurred with message ${error.toString()}`);
}