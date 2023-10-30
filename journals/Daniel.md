Oct 23
Spent admittedly too much time trying to catch up while not communicating with team members, completely my fault on that and didn't contribute much prior to this point, dealing with issues outside of the project that I won't divulge here, but started working on "search page" and will work on "my stuff page" afterwards.

Oct 24
Having issues seeing any of the pages loaded so can't tell how the search page looks like, but have what I think is a rough skeleton that should function.

Oct 25
Resolved issue with not being able to see, but the page itself is not exactly what I had in mind -- it only filters through a very small amount of movies, and for some reason it shows the whole list of movies that it's filtering through below the search bar and simply eliminates the entries if the text in the search bar doesn't match with their respective titles. What I had in mind was more that I would be able to type in a search, then press enter, then see the results afterwards.

Saw that there was a search bar implemented in the "home page", realized that

a. my search page is obsolete and pretty much malfunctioning in terms of what I want, and

b. a separate page just for search is unnecessary since the search bar implemented into the home page will show the results in the way that I thought best.

Therefore, deleted my page and just tried to alter the current search bar to function a bit "better": made it so that after entering the search, the letters/words will be removed from the search bar and it will reset to blank. Trying to see what else needs working on, since I think the "bookmarked page" is equivalent to the "my stuff page". Asked about what might need working on, and there wasn't a concrete response, but "bookmarked" seems a bit underworked, so I will probably focus on that.

Also noted that the password input for the "sign up" does not hash the password, but shows it as plain text, so will look to change that as well.

(this is just a list of things that I'm noting while going through each link, will try to work on all of these)

1. password for both signup and sign in are not hashed
2. allowing me to keep "logging in" even though I should already be logged in
3. am able to sign up with multiple accounts with the same exact details
4. sign in with a non-existent id or incorrect password gives me:

    Uncaught runtime errors:
    ERROR
    isLoggedIn is not a function
    TypeError: isLoggedIn is not a function
        at handleSubmit (http://localhost:3001/static/js/bundle.js:1594:7)

5. signout option is available even when I'm not signed in, and I'm able to keep pressing "logout", which brings me to the main page
6. bookmarked movies is available even when signed out, which should be account/user specific I assume
7. it feels like "homepage" isn't really the home page, and instead it's the account sign in/sign up, so should adjust that (I think)

Oct 26
Some of these issues were resolved and fixed, so I will work on other aspects of the project. The things that I want to try out are:

1. light/dark mode
2. a new page for the site, not sure exactly what since I feel like most of them are already addressed

In the meantime, I will keep checking on the main branch to see if, even with the updates, there are small things that I can address.

Oct 27
Light/dark mode is proving a bit too difficult for me, but I will keep trying since it would be a pretty nice addition without affecting other aspects of the project (I think), so it can be worked on independently.

Oct 28
I realized I completely forgot about the unit test, so I will be rewatching the lectures on that and trying to finish that as soon as possible.

Oct 29
Still figuring out what exactly/how to test for my unit test, but I did finish the page that I wanted to implement. I thought of a random movie generator, but since that's a bit too vague, I wanted to give it a few specifics, so I chose "genre" as the specifier. On the page, the user can click on any of the genre buttons and get a movie at random.
What I've found is that some of the movies are a bit inappropriate, so I want to try and filter them out, but I'll only work on that after I've finished the necessities.

I fixed a few additional things:
1. The texts on login/signup/account details were fairly large, so I scaled them down to what seemed right for the page's layout.
2. The password text for "signup" was still unhashed, so I changed that.
3. The signup page had the input box to the left of the label, but I thought that seemed a bit unintuitive, so I swapped the orders.
4. The spacing on the signup page was a little strange, so I tried to align them as best as I could.