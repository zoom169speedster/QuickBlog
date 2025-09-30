/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
*/

import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers.authorization

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.json({success: false, message: "Invalid Token"})
    }
}

export default auth