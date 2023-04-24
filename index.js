// Skill Animations

function Skill(name, percent, elementId, timer) {
    this.name = name;
    this.percent = percent;
    this.element = document.getElementById(elementId);
    this.counter = 0;
    this.timer = timer;
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
    new Skill("skill1", 100, "skill1", 19),
    new Skill("skill2", 100, "skill2", 19),
    new Skill("skill3", 90, "skill3", 21),
    new Skill("skill4", 60, "skill4", 32),
    new Skill("skill5", 60, "skill5", 32),
    new Skill("skill6", 30, "skill6", 65)
];

skills.forEach(skill => {
    skill.animate();
});

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
  

