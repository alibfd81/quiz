function TextField({ label, value, setValue,type }) {
    return (
        <div className="space-y-4">
            <label htmlFor="">{label}</label>
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className="textField__input" />
        </div>
    )
}

export default TextField
