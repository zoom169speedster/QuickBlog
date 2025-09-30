/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
*/

import multer from 'multer'

const upload = multer({storage: multer.diskStorage({})})

export default upload