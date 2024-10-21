exports.validationFields=(fields)=>{
    return fields.every(field=>field)
}

exports.emailValidation=(email)=>{
    const emailRejex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRejex.test(email)
}

exports.passwordValidation=(password)=>{
    const passwordRejex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRejex.test(password)
}

// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; = strong password condition