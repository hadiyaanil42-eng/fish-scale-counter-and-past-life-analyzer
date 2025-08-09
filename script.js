const uploadInput = document.getElementById("imageUpload");
const canvas = document.getElementById("fishCanvas");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");

let uploadedImage = null;

uploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            uploadedImage = img;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Fake scale count between 20 and 150
            const scaleCount = Math.floor(Math.random() * 130) + 20;

            // Draw fake white dots for "scales"
            for (let i = 0; i < scaleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
            }

            // Display count text on the canvas with a background for visibility
                ctx.font = "bold 30px Arial";
                ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; // semi-transparent black background
                ctx.fillRect(5, 5, 220, 45); // rectangle behind text

                ctx.fillStyle = "white";
                ctx.fillText(`Scales: ${scaleCount}`, 10, 35);



            // Generate ridiculous fish biography
            const fishLife = generateFishLife(scaleCount);
            resultDiv.innerHTML = `
                <h2>Fish Past Life Report</h2>
                <p><b>Date of Birth:</b> ${fishLife.dob}</p>
                <p><b>Date of Death:</b> ${fishLife.dod}</p>
                <p><b>Cause of Death:</b> ${fishLife.cause}</p>
                <p><b>Past Relationships:</b> ${fishLife.relationship}</p>
                <p><b>Weird Family Background:</b> ${fishLife.background}</p>
            `;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function generateFishLife(scaleCount) {
    // Random date generator
    const randomDate = () => {
        const year = 1900 + Math.floor(Math.random() * 124);
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        return `${day}/${month}/${year}`;
    };

    const causes = [
        "Choked on a bubble",
        "Got into a dance battle with a shark",
        "Accidentally joined a sushi party",
        "Lost a staring contest with a crab",
        "Fell in love with a jellyfish and forgot to swim"
    ];

    const relationships = [
        "Dated a goldfish for 3 days",
        "Was engaged to a shrimp but ran away",
        "Had a secret crush on a starfish",
        "Married to a tuna for tax benefits",
        "In a complicated thing with a seahorse"
    ];

    const backgrounds = [
        "Descended from royal koi family",
        "Related to the famous 'Finding Nemo' cast",
        "Has a pirate ancestor",
        "Family owns the largest bubble factory underwater",
        "Great-grandfish discovered Atlantis"
    ];

    return {
        dob: randomDate(),
        dod: randomDate(),
        cause: causes[Math.floor(Math.random() * causes.length)],
        relationship: relationships[Math.floor(Math.random() * relationships.length)],
        background: backgrounds[Math.floor(Math.random() * backgrounds.length)]
    };
}



