/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
*/

import mongoose from "mongoose"
 
const MONGODB_URI = process.env.MONGODB_URI
const qureyIndex = MONGODB_URI.indexOf('?')
const MODIFIED_URI = MONGODB_URI.slice(0, qureyIndex) + 'quickblog' + MONGODB_URI.slice(qureyIndex)
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"))
        
        // await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
        await mongoose.connect(MODIFIED_URI)
        
    } catch(error) {
        console.log(error.message);
    }
}

export default connectDB

// let mongodb_uri = 'mongodb+srv://zoom169speedster:HunterZolomon@zoom-cluster.wtvvdih.mongodb.net/?retryWrites=true&w=majority&appName=zoom-cluster'
// const qureyIndex = mongodb_uri.indexOf('?')
// const modified_uri = mongodb_uri.slice(0, qureyIndex) + 'quickblog' + mongodb_uri.slice(qureyIndex)
// console.log(modified_uri)