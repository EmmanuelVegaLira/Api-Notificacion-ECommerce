import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"
import config from "config"
import socketIO from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

/*****************************************************
 *Parameters: @param req, @param res, @param next
 *Description: Verifica el token
 *Correct result: (Guarda usuario y next)
 * Incorrect result: res.json(ok, message, response, code)
 *****************************************************/
export async function checkToken(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers.authorization

    await verify(token, config.get('jwt.accessTokenSecret'), (err: any, decode: any) => {
        if (err) {
            return res.status(401).json({ok: false, message: 'No esta autorizado', response: err, code: 401})
        }
        req.body.user = decode.user
        next()
    })
}

/*****************************************************
 *Parameters: @param req, @param res, @param next
 *Description: Verificar token y guardar userId
 *Correct result: userId
 *Incorrect result: null
 *****************************************************/
export async function checkTokenIO(client: socketIO.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: any) {
    // Get token
    const token = client.request.headers.authorization

    // Verify null
    if (!token) {
        return next(new Error('Token enviado en nulo'))
    }
    try {
        await verify(token, config.get('jwt.accessTokenSecret'), (err: any, decode: any) => {
            if (err) {
                throw new Error('Token no autorizado')
            }

            // Save sessionId
            client.data.userId = decode.user._id
            next()
        })
    } catch (err) {
        return next(new Error('ERROR CRITICAL'))
    }
}