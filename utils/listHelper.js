// dummy function for jest test

function dummy(blogs){
    return 1;
}

function totalLikes(arr){

    all_likes = arr.map(blog => blog.likes)

    const likes_sum = all_likes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    return likes_sum
}

function favoriteBlog(arr){

    all_likes = arr.map(blog => blog.likes)

    return Math.max(...all_likes)
}

module.exports = {dummy, totalLikes, favoriteBlog}