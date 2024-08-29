import jwt from 'jsonwebtoken'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJpbmRpYW5hcm15cGFyYTk4MjZAZ21haWwuY29tIiwiaWF0IjoxNzI0OTI3NTY2LCJleHAiOjE3MjQ5MzExNjZ9.Nz7QdoD0XeUwZlUj-WcJJ3hQqGUXBs3eYHIRNmwvHK8'
const secretKey = '65ef3aaa4f6fa7e0a8642eefe67b7df55a6c91265ebf9c3a76b37f0dcc39d5df'

jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.log("error in verifying")
        return res.status(401).json({ message: 'Failed to authenticate token.' })
    
    }else{
        console.log("success verify")
    }
    });
