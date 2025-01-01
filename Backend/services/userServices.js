 


module.exports.createUser = async ({ firstname, lastname, email, password }) => {

    if (!firstname || !lastname || !email || !password) {
        throw new Error('All Fields are required')
    }
    try {
        const user = await userModel.create({
            fullname: {
                firstname, lastname
            },
            email,
            password
        })
        return user
    }
    catch (error) {
        console.error(error)
    }
}