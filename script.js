/* =====================================
   QUEUELESS JAVASCRIPT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================
           ELEMENTS
        ================================= */

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );

        const queueModal =
            document.getElementById(
                "queueModal"
            );

        const tokenModal =
            document.getElementById(
                "tokenModal"
            );

        const modalClose =
            document.getElementById(
                "modalClose"
            );

        const tokenClose =
            document.getElementById(
                "tokenClose"
            );

        const closeTokenBtn =
            document.getElementById(
                "closeTokenBtn"
            );

        const queueForm =
            document.getElementById(
                "queueForm"
            );

        const tokenNumber =
            document.getElementById(
                "tokenNumber"
            );

        const tokenAhead =
            document.getElementById(
                "tokenAhead"
            );

        const tokenWait =
            document.getElementById(
                "tokenWait"
            );

        const tokenBusiness =
            document.getElementById(
                "tokenBusiness"
            );


        /* =================================
           THEME
        ================================= */

        const savedTheme =
            localStorage.getItem(
                "queueLessTheme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark"
            );

            themeToggle.textContent =
                "☀";

        }


        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark"
                    );


                themeToggle.textContent =
                    isDark ? "☀" : "☾";


                localStorage.setItem(
                    "queueLessTheme",
                    isDark
                        ? "dark"
                        : "light"
                );

            }
        );


        /* =================================
           OPEN QUEUE MODAL
        ================================= */

        function openQueueModal() {

            queueModal.classList.add(
                "open"
            );

            document.body.style.overflow =
                "hidden";

        }


        function closeQueueModal() {

            queueModal.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }


        document
            .getElementById("openQueueBtn")
            .addEventListener(
                "click",
                openQueueModal
            );


        document
            .getElementById("heroJoinBtn")
            .addEventListener(
                "click",
                openQueueModal
            );


        document
            .getElementById("ctaJoinBtn")
            .addEventListener(
                "click",
                openQueueModal
            );


        modalClose.addEventListener(
            "click",
            closeQueueModal
        );


        /* =================================
           GENERATE TOKEN
        ================================= */

        queueForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const business =
                    document.getElementById(
                        "businessSelect"
                    ).value;


                const serviceSelect =
                    document.getElementById(
                        "serviceSelect"
                    );


                const service =
                    serviceSelect.value;


                const name =
                    document.getElementById(
                        "customerName"
                    ).value.trim();


                if (
                    !business ||
                    !service ||
                    !name
                ) {

                    return;

                }


                const selectedOption =
                    serviceSelect.options[
                        serviceSelect.selectedIndex
                    ];


                const serviceTime =
                    Number(
                        selectedOption.dataset.time
                    ) || 15;


                /* Get existing queue */

                let queue =
                    JSON.parse(
                        localStorage.getItem(
                            "queueLessData"
                        )
                    ) || [];


                const nextToken =
                    queue.length > 0
                        ? Math.max(
                            ...queue.map(
                                item =>
                                    item.token
                            )
                        ) + 1
                        : 1;


                const peopleAhead =
                    Math.min(
                        queue.length,
                        8
                    );


                const estimatedWait =
                    peopleAhead *
                    serviceTime;


                const customer = {

                    token:
                        nextToken,

                    name:
                        name,

                    business:
                        business,

                    service:
                        service,

                    serviceTime:
                        serviceTime,

                    status:
                        "waiting",

                    createdAt:
                        new Date().toISOString()

                };


                queue.push(
                    customer
                );


                localStorage.setItem(
                    "queueLessData",
                    JSON.stringify(queue)
                );


                /* Display token */

                tokenNumber.textContent =
                    "#" + nextToken;


                tokenAhead.textContent =
                    peopleAhead;


                tokenWait.textContent =
                    estimatedWait +
                    " min";


                tokenBusiness.textContent =
                    business +
                    " • " +
                    service;


                closeQueueModal();


                tokenModal.classList.add(
                    "open"
                );


                document.body.style.overflow =
                    "hidden";


                queueForm.reset();

            }
        );


        /* =================================
           CLOSE TOKEN MODAL
        ================================= */

        function closeTokenModal() {

            tokenModal.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }


        tokenClose.addEventListener(
            "click",
            closeTokenModal
        );


        closeTokenBtn.addEventListener(
            "click",
            closeTokenModal
        );


        /* =================================
           CLOSE MODALS WITH ESC
        ================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeQueueModal();

                    closeTokenModal();

                }

            }
        );


        /* =================================
           BUSINESS BUTTON
        ================================= */

        document
            .getElementById("businessBtn")
            .addEventListener(
                "click",
                function () {

                    alert(
                        "Business dashboard coming next!"
                    );

                }
            );


        /* =================================
           MOBILE MENU
        ================================= */

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const navLinks =
            document.querySelector(
                ".nav-links"
            );


        mobileMenu.addEventListener(
            "click",
            function () {

                const isVisible =
                    navLinks.style.display ===
                    "flex";


                navLinks.style.display =
                    isVisible
                        ? ""
                        : "flex";


                if (!isVisible) {

                    navLinks.style.position =
                        "absolute";

                    navLinks.style.top =
                        "68px";

                    navLinks.style.left =
                        "0";

                    navLinks.style.right =
                        "0";

                    navLinks.style.padding =
                        "20px";

                    navLinks.style.flexDirection =
                        "column";

                    navLinks.style.background =
                        "var(--surface)";

                    navLinks.style.borderBottom =
                        "1px solid var(--border)";

                }

            }
        );


        /* =================================
           NAVIGATION ACTIVE STATE
        ================================= */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const links =
            document.querySelectorAll(
                ".nav-links a"
            );


        window.addEventListener(
            "scroll",
            function () {

                let current = "";


                sections.forEach(
                    function (section) {

                        const sectionTop =
                            section.offsetTop;


                        if (
                            window.scrollY >=
                            sectionTop - 150
                        ) {

                            current =
                                section.id;

                        }

                    }
                );


                links.forEach(
                    function (link) {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            "#" + current
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );

    }
);
