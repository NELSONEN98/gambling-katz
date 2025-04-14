import "../assets/scss/ui/_studies.scss";

export default function Studies() {
  return (
    <div className="studies__container">
      <div className="studies__grid">
        <div className="studies__container__text">
          <h2 className="studies__title">My learning journey</h2>
          <p>
            I'm a self-taught web developer with a passion for learning and
            growing in the field.
          </p>
          <p>
            My journey has been fueled by curiosity and a desire to create
            impactful digital experiences.
          </p>
        </div>
        <div className="studies__container__img">
          <img className="studies__pixel" src="img/bg1.png" alt="bg1" />
        </div>
      </div>
    </div>
  );
}
