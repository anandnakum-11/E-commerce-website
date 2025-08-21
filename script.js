document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navmenu');
    
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navmenu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('bx-x');
            navbar.classList.remove('open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Validation
    function contactus() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phonenumber = document.getElementById("phonenumber").value.trim();
        const message = document.querySelector("textarea").value.trim();
        
        // Reset error states
        document.getElementById("name").classList.remove('error');
        document.getElementById("email").classList.remove('error');
        document.getElementById("phonenumber").classList.remove('error');
        document.querySelector("textarea").classList.remove('error');
        
        let isValid = true;
        
        if (name === "") {
            document.getElementById("name").classList.add('error');
            isValid = false;
        }
        
        if (email === "" || !validateEmail(email)) {
            document.getElementById("email").classList.add('error');
            isValid = false;
        }
        
        if (phonenumber === "" || !validatePhone(phonenumber)) {
            document.getElementById("phonenumber").classList.add('error');
            isValid = false;
        }
        
        if (message === "") {
            document.querySelector("textarea").classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            showNotification('Your message has been sent successfully!');
            document.querySelector("form").reset();
            return false; // Prevent actual form submission for demo
        }
        
        return false;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[0-9]{10}$/; // Simple 10-digit validation
        return re.test(phone);
    }
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Book category filter functionality
    const searchInput = document.querySelector('.search');
    const searchIcon = document.querySelector('.bx-search');
    
    searchIcon.addEventListener('click', searchBooks);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });
    
    function searchBooks() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') return;
        
        const books = document.querySelectorAll('.books');
        let found = false;
        
        books.forEach(book => {
            const title = book.querySelector('h4').textContent.toLowerCase();
            const desc = book.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                book.style.display = 'block';
                book.scrollIntoView({ behavior: 'smooth', block: 'center' });
                book.classList.add('highlight');
                setTimeout(() => {
                    book.classList.remove('highlight');
                }, 2000);
                found = true;
            } else {
                book.style.display = 'none';
            }
        });
        
        if (!found) {
            showNotification('No books found matching your search');
        }
    }

    // Reset search when clicking the search icon while input is empty
    searchIcon.addEventListener('click', function() {
        if (searchInput.value.trim() === '') {
            document.querySelectorAll('.books').forEach(book => {
                book.style.display = 'block';
            });
        }
    });

    // Add to cart functionality (simulated)
    document.querySelectorAll('.books').forEach(book => {
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.innerHTML = '<i class="bx bx-cart-add"></i> Add to Cart';
        addButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const bookTitle = book.querySelector('h4').textContent;
            showNotification(`"${bookTitle}" added to cart`);
        });
        book.appendChild(addButton);
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Book hover effect enhancement
    document.querySelectorAll('.books').forEach(book => {
        book.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        book.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });

    // Section reveal animation on scroll
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
});