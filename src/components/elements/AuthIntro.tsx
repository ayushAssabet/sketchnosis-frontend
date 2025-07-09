
interface AuthIntroPropsInterface { 
    title : string , 
    supportText : string
}
const AuthIntro : React.FC<AuthIntroPropsInterface> = ({
    title , 
    supportText
}) => {
    return(
        <div className="auth-intro text-center">
            <h2 className="font-popins text-4xl font-medium mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>{title}</h2>
            <p className="text-muted text-lg">{supportText}</p>
        </div>
    )
}

export default AuthIntro