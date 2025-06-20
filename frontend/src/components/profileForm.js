const ProfileForm = ({ form, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="form-control"
          value={form.username || ""}
          disabled
        />
      </div>
      {[
        { label: "Name", name: "name", type: "text", required: true },
        { label: "Surname", name: "surname", type: "text", required: true },
        { label: "City", name: "city", type: "text", required: true },
        { label: "Postcode", name: "postcode", type: "text", required: true },
        {
          label: "Address (optional)",
          name: "address",
          type: "text",
          required: false,
        },
        {
          label: "Phone (optional)",
          name: "phone",
          type: "tel",
          required: false,
        },
      ].map((field) => (
        <div className="mb-3" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            className="form-control"
            value={form[field.name] || ""}
            onChange={handleChange}
            {...(field.required ? { required: true } : {})}
          />
        </div>
      ))}

      <div className="mb-3">
        <label htmlFor="picture" className="form-label">
          Profile Picture (optional)
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <fieldset className="mb-4">
        <legend className="col-form-label">Preferred Contact</legend>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="contactBy"
            id="contact-email"
            value="email"
            checked={form.contactBy === "email"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="contact-email">
            Email
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="contactBy"
            id="contact-phone"
            value="phone"
            checked={form.contactBy === "phone"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="contact-phone">
            Phone
          </label>
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary w-100">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
