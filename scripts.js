document.addEventListener("DOMContentLoaded", function() {
  // Display mentors on the page
  function displayMentors() {
    const mentorContainer = document.getElementById('mentor-cards');
    mentors.forEach(mentor => {
      const mentorCard = document.createElement('div');
      mentorCard.classList.add('card');
      mentorCard.innerHTML = `
        <h3>${mentor.name}</h3>
        <p><strong>Role:</strong> ${mentor.role}</p>
        <p>${mentor.bio}</p>
        <button onclick="connectWithMentor('${mentor.name}')">Connect</button>
      `;
      mentorContainer.appendChild(mentorCard);
    });
  }
  
  function connectWithMentor(name) {
    alert(`You have connected with ${name}!`);
  }
  
  // Profile form submission
  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Profile saved!');
  });
  
  // Message form submission
  document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    document.getElementById('message-input').value = ''; // Clear input field
  });
  
  displayMentors();

const categoryLinks = document.querySelectorAll('.category-list a');
const jobCategories = document.querySelectorAll('.job-category');

jobCategories.forEach((category, index) => {
  if (index !== 0) category.style.display = 'none'; // Show first category by default
});

categoryLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);

    jobCategories.forEach(category => {
      if (category.id === targetId) {
        category.style.display = 'block';
      } else {
        category.style.display = 'none';
      }
    });

    // Highlight active category link
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
// Chat box toggle
// Function to toggle the chat box visibility
function toggleChat() {
  const chatBox = document.getElementById('chat-box');
  const chatBody = chatBox.querySelector('.chat-body');
  const chatFooter = chatBox.querySelector('.chat-footer');
  const minimizeBtn = chatBox.querySelector('.minimize-btn');

  // Check if the chat is currently minimized
  if (chatBody.style.display === 'none') {
    chatBody.style.display = 'block'; // Show the chat body
    chatFooter.style.display = 'flex'; // Show the chat footer
    minimizeBtn.textContent = '-'; // Change the button text to minimize
  } else {
    chatBody.style.display = 'none'; // Hide the chat body
    chatFooter.style.display = 'none'; // Hide the chat footer
    minimizeBtn.textContent = '+'; // Change the button text to expand
  }
}


// Handle chat form submission
// Add functionality to handle user messages
const chatMessages = document.getElementById('chatMessages');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

// Event listener for the Send button
sendMessageButton.addEventListener('click', () => {
    const messageText = userMessageInput.value.trim();
    if (messageText) {
        addMessage('user', messageText);
        userMessageInput.value = ''; // Clear the input
        scrollChatToBottom();
    }
});

// Function to add a message
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p><strong>${sender === 'user' ? 'You' : 'Admin'}:</strong> ${text}</p>`;
    chatMessages.appendChild(messageElement);
}

function applyFilters() {
    // Get all selected checkbox values
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(checkbox => checkbox.value);

    // Get all job items
    const jobItems = document.querySelectorAll('.job-list li');

    // Loop through each job item and toggle visibility
    jobItems.forEach(job => {
        const jobCategories = job.getAttribute('data-category').split(',');

        // Check if the job's categories overlap with selected categories
        const matches = selectedCategories.some(category => jobCategories.includes(category));

        // Show the job if it matches a filter or if no filters are selected
        if (selectedCategories.length === 0 || matches) {
            job.style.display = 'block';
        } else {
            job.style.display = 'none';
        }
    });
}
function applyFilters() {
    // Get all the selected category checkboxes
    const selectedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('.category-filter:checked');
    categoryCheckboxes.forEach((checkbox) => {
        selectedCategories.push(checkbox.value);
    });

    // Get the selected location filter
    const selectedLocation = document.querySelector('.location-filter:checked')?.value || "";

    // Get all the internship list items
    const internships = document.querySelectorAll('.internship-list li');

    internships.forEach((internship) => {
        const category = internship.getAttribute('data-category');
        const location = internship.querySelector('p:nth-child(3)').textContent.split(': ')[1]; // Extract location from <p>

        // Check if the internship matches the selected filters
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
        const locationMatch = selectedLocation === "" || location === selectedLocation;

        // Show or hide the internship based on the filters
        if (categoryMatch && locationMatch) {
            internship.style.display = 'block';
        } else {
            internship.style.display = 'none';
        }
    });
}

// Function to reset filters
function resetFilters() {
    // Uncheck all the category checkboxes
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    categoryCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Reset location filter to "All" (empty value)
    const locationRadios = document.querySelectorAll('.location-filter');
    locationRadios.forEach((radio) => {
        radio.checked = radio.value === "";
    });

    // Show all internships
    const internships = document.querySelectorAll('.internship-list li');
    internships.forEach((internship) => {
        internship.style.display = 'block';
    });
}

// Add event listener to the filter form
document.getElementById('filterForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    applyFilters();
});

});
// Elements
const messagesDiv = document.getElementById('messages');
const userMessageInput = document.getElementById('userMessage');

// Function to send message
function sendMessage() {
  const userMessage = userMessageInput.value.trim();

  if (userMessage) {
    // Display user message in chat
    addMessage(userMessage, 'user');
    
    // Simulate a bot response after a short delay
    setTimeout(() => {
      addMessage('Thank you for your message! How can I assist you further?', 'bot');
    }, 1000);
    
    // Clear the input field
    userMessageInput.value = '';
  }
}

// Function to add a message to the chat box
function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  messagesDiv.appendChild(messageDiv);
  
  // Scroll to the bottom after adding the message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Function to close the chat window
function closeChat() {
  const chatContainer = document.getElementById('chatContainer');
  chatContainer.style.display = 'none'; // Hide the chat container
}

// Message form submission with "Message Sent" notification
document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    
    // Clear the input field immediately after submission
    document.getElementById('message-input').value = ''; // This will make the message vanish from the input field
  
    // Display "Message Sent" notification
    displayMessageSentNotification();
  });
  
  // Function to display "Message Sent" notification
  function displayMessageSentNotification() {
    const notification = document.createElement('div');
    notification.classList.add('message-sent-notification');
    notification.textContent = "Message Sent!";
    
    // Append the notification to the body or a specific container
    document.body.appendChild(notification);
  
    // Remove the notification after a few seconds
    setTimeout(() => {
      notification.remove();
    }, 3000); // Notification will disappear after 3 seconds
  }
// Select buttons
const signUpButton = document.querySelector('.sign-up-link');
const logInButton = document.querySelector('.log-in-link');

// Select notification element
const notification = document.getElementById('notification');

// Function to show the notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show'); // Hide after 3 seconds
  }, 3000);
}

signUpButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior (navigation)
    showNotification();
  });
  
  logInButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior (navigation)
    showNotification();
  });
  document.querySelector('.filter-button').addEventListener('click', function() {
    const filters = document.querySelectorAll('.filter-item');
    filters.forEach(function(filter) {
      // Apply filter functionality here
    });
  });
function applyFilters() {
  // Get the selected categories and location filter
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(input => input.value);
  const locationFilter = document.querySelector('.location-filter:checked').value;

  // Get all job and internship items
  const jobItems = document.querySelectorAll('.job-list li');
  const internshipItems = document.querySelectorAll('.internship-list li');

  // Function to apply filtering for a given item list
  const applyItemFilter = (items, type) => {
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      const location = item.getAttribute('data-location');
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      const matchesLocation = locationFilter === "" || locationFilter === location;

      // Display or hide the item based on filter match
      if (matchesCategory && matchesLocation) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // Apply filters to both job and internship items
  applyItemFilter(jobItems, 'job');
  applyItemFilter(internshipItems, 'internship');
}

function resetFilters() {
  // Uncheck all category filters
  document.querySelectorAll('.category-filter').forEach(input => input.checked = false);

  // Reset location filter to 'All'
  document.querySelector('input[name="location-filter"][value=""]').checked = true;

  // Show all job and internship items
  const jobItems = document.querySelectorAll('.job-list li');
  const internshipItems = document.querySelectorAll('.internship-list li');
  jobItems.forEach(job => job.style.display = 'block');
  internshipItems.forEach(internship => internship.style.display = 'block');

  console.log("Filters reset!");
}