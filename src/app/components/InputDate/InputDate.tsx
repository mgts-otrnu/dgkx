import "./InputDate.scss";

function InputDate({name, id, onChange, disabled}: {name: string, id: string, onChange: (event: any) => void, disabled?: boolean}) {
    return (
        <label className={`input-wrapper ${id === "input-access-from" ? "access-from" : id === "input-access-to" ? "access-to" : "creation"}`}>
            <input className="form-control"
                   name={name}
                   id={id}
                   type="date"
                   disabled={disabled}
                   onFocus={(event) => {
                       event.target.parentElement?.classList.add("hidden");
                   }}
                   onBlur={(event) => {
                       if (event.target.value) {
                           return;
                       } else {
                           event.target.parentElement?.classList.remove("hidden");
                       }
                   }}
                   onChange={onChange}/>
        </label>
    );
}

export default InputDate;