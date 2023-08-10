// Skill Animations

function Skill(name, percent, elementId, timer, innerElement, progressClass) {
    this.name = name;
    this.percent = percent;
    this.element = document.getElementById(elementId);
    this.counter = 0;
    this.timer = timer;
    this.progressClass = progressClass;
    this.innerElement = document.getElementById(innerElement);
}

Skill.prototype.animate = function(){
    setInterval (() => {
            if (this.counter < this.percent){
                this.counter += 1;
                this.element.innerHTML = this.counter + "%";
            } else {
                this.element.innerHTML = this.percent + "%";
            }
        }, this.timer);
}

const skills = [
  new Skill("skill1", 100, "skill1", 19, "inner-skill1", "skill1-progress"),
  new Skill("skill2", 100, "skill2", 19,"inner-skill2", "skill2-progress"),
  new Skill("skill3", 90, "skill3", 21,"inner-skill3", "skill3-progress"),
  new Skill("skill4", 60, "skill4", 32,"inner-skill4", "skill4-progress"),
  new Skill("skill5", 60, "skill5", 32,"inner-skill5", "skill5-progress"),
  new Skill("skill6", 30, "skill6", 65,"inner-skill6", "skill6-progress")
];



function startAnimation() {
  skills.forEach(skill => {
      
      skill.animate();
      skill.innerElement.classList.add(skill.progressClass);
  });

}
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(entry.target); // Unobserve the target after animation starts
      }
  });
}, options);

const target = document.querySelector('#skill-percent');
observer.observe(target);

// Contact Form Logic

(function () {
    "use strict";
    /*
     * Form Validation
     */
  
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener("submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
  
            form.querySelectorAll(":invalid")[0].focus();
          } else {
            /*
             * Form Submission using fetch()
             */
  
            const formData = new FormData(form);
            event.preventDefault();
            event.stopPropagation();
            const object = {};
            formData.forEach((value, key) => {
              object[key] = value;
            });
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait...";
  
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: json
            })
              .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-green-500");
                } else {
                  console.log(response);
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-red-500");
                }
              })
              .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
              })
              .then(function () {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                  result.style.display = "none";
                }, 5000);
              });
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  

