function Button(props)
{
    const styles = {
        button: {
            alignItems: "flex-start",
            background: "rgba(255,255,255,1)",
            border: "1px solid",
            borderColor: "rgba(24,160,251,1)",
            borderRadius: "6px",
            display: "flex",
            height: "40px",
            minWidth: "130px",
            maxWidth: "130px",
            padding: "10px 41px",
        },
        place: {
            height: "18px",
            letterSpacing: "-0.23px",
            lineHeight: "normal",
            minWidth: "46px",
            textAlign: "center",
            color: "rgba(24,160,251,1)",
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "normal",
            fontStyle: "15px",
        }

    }
    const {children, className, onClick, type} = props;
    return (
      <div style={styles.button}>
          <div style={styles.place}>
              {children}
          </div>
      </div>
    );
}

export default Button;
