    // get homepage from backend
    const response = await fetch(`/api/home`, {
        method: 'GET',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
      
        },
      });
  //display homepage
      if (response.ok) {
        document.location.render('home');
      } else {
        alert('Failed to create blog');
      }
    
      