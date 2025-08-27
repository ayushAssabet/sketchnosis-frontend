interface AuthIntroPropsInterface {
    title: string;
    supportText: string;
    supportClassName?: string;
    titleClassName?: string;
}
const AuthIntro: React.FC<AuthIntroPropsInterface> = ({
    title,
    supportText,
    supportClassName,
    titleClassName,
}) => {
    return (
        <div className="auth-intro text-center">
            <h2
                className={`font-popins text-4xl font-medium mb-1 ${titleClassName}`}
                style={{ fontFamily: "var(--font-poppins)" }}
            >
                {title}
            </h2>
            <p className={`text-muted text-lg ${supportClassName}`}>
                {supportText}
            </p>
        </div>
    );
};

export default AuthIntro;
