
// =====================================
// ZAINA GULL - PORTFOLIO JAVASCRIPT
// =====================================


// 1. MOBILE MENU

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
        });
    });
}


// 2. PORTFOLIO FILTERS

const filterButtons = document.querySelectorAll(".filters button");
const projectCards = document.querySelectorAll(".project-card");

// Categories match the 18 projects in index.html
const projectCategories = [
    "Product Advertising", // 01
    "Social Media",        // 02
    "Social Media",        // 03
    "Social Media",        // 04
    "Product Advertising", // 05
    "Brand Identity",      // 06
    "Brand Identity",      // 07
    "Social Media",        // 08
    "Product Advertising", // 09
    "Social Media",        // 10
    "Brand Identity",      // 11
    "Brand Identity",      // 12
    "Brand Identity",      // 13
    "Social Media",        // 14
    "Brand Identity",      // 15
    "Other",               // 16
    "Social Media",        // 17
    "UI/UX Designs"        // 18
];

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Show matching projects
        projectCards.forEach((card, index) => {

            const category = projectCategories[index];

            if (
                selectedFilter === "all" ||
                selectedFilter === category
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// 3. PROJECT IMAGE PREVIEW

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach(button => {

    button.addEventListener("click", () => {

        const image = button.querySelector("img");

        if (!image || !image.complete || image.naturalWidth === 0) {
            alert("Project image could not be loaded. Please check its file name.");
            return;
        }

        // Create preview overlay
        const preview = document.createElement("div");

        preview.className = "image-preview";

        // Preview styling
        Object.assign(preview.style, {
            position: "fixed",
            inset: "0",
            zIndex: "9999",
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px"
        });

        const content = document.createElement("div");

        Object.assign(content.style, {
            position: "relative",
            maxWidth: "900px",
            maxHeight: "90vh",
            textAlign: "center"
        });

        const closeButton = document.createElement("button");

        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close preview");

        Object.assign(closeButton.style, {
            position: "absolute",
            top: "-40px",
            right: "0",
            border: "none",
            background: "transparent",
            color: "#ffffff",
            fontSize: "36px",
            cursor: "pointer"
        });

        const previewImage = document.createElement("img");

        previewImage.src = image.src;
        previewImage.alt = image.alt;

        Object.assign(previewImage.style, {
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "8px"
        });

        const caption = document.createElement("p");

        caption.textContent = image.alt;

        Object.assign(caption.style, {
            color: "#ffffff",
            marginTop: "12px"
        });

        content.append(closeButton, previewImage, caption);
        preview.appendChild(content);
        document.body.appendChild(preview);

        // Close preview
        const closePreview = () => {
            preview.remove();
            document.removeEventListener("keydown", handleEscape);
        };

        const handleEscape = event => {
            if (event.key === "Escape") {
                closePreview();
            }
        };

        closeButton.addEventListener("click", closePreview);

        preview.addEventListener("click", event => {
            if (event.target === preview) {
                closePreview();
            }
        });

        document.addEventListener("keydown", handleEscape);

    });

});


// 4. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

function getContactDetails() {

    if (!contactForm || !contactForm.checkValidity()) {
        if (contactForm) {
            contactForm.reportValidity();
        }
        return null;
    }

    const name = document.getElementById("clientName").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const message = document.getElementById("clientMessage").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields first.");
        return null;
    }

    return { name, email, message };
}


// 5. SEND MESSAGE VIA EMAIL

const sendEmailButton = document.getElementById("sendEmail");

if (sendEmailButton) {

    sendEmailButton.addEventListener("click", async () => {

        const form = document.getElementById("contactForm");

        if (!form || !form.checkValidity()) {
            if (form) {
                form.reportValidity();
            }
            return;
        }

        const name = document.getElementById("clientName").value.trim();
        const email = document.getElementById("clientEmail").value.trim();
        const message = document.getElementById("clientMessage").value.trim();

        sendEmailButton.disabled = true;
        sendEmailButton.textContent = "Sending...";

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/zee662070@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: "New Message From Zaina Portfolio"
                    })
                }
            );

            const result = await response.json();

            if (String(result.success) !== "true") {
                throw new Error(result.message || "Email submission failed");
            }

            alert("Message submitted successfully!");
            form.reset();

        } catch (error) {
            alert("Message send nahi hua: " + error.message);
            console.error(error);

        } finally {
            sendEmailButton.disabled = false;
            sendEmailButton.textContent = "Send via Email ↗";
        }
    });

}


// 6. SEND MESSAGE VIA WHATSAPP

const sendWhatsAppButton = document.getElementById("sendWhatsApp");

if (sendWhatsAppButton) {

    sendWhatsAppButton.addEventListener("click", () => {

        const details = getContactDetails();

        if (!details) return;

        const whatsappMessage = encodeURIComponent(
            `Hello Zaina!\n\nName: ${details.name}\nEmail: ${details.email}\n\nProject Details:\n${details.message}`
        );

        const whatsappURL =
            `https://wa.me/923325003769?text=${whatsappMessage}`;

        window.open(whatsappURL, "_blank");

    });

}


// 7. SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetID = link.getAttribute("href");

        if (!targetID || targetID === "#") return;

        const target = document.querySelector(targetID);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// 8. FOOTER YEAR

const footerYear = document.querySelector("footer small");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} Zaina Gull. All Rights Reserved.`;

}
