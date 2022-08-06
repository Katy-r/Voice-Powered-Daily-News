// Use this sample to create your own voice commands
intent(`(hi|hello|hey)`, p => {
    p.play('(hello|hi there)');
});

intent(`(What should I do|help)`, p => {
    p.play('Spell out a category');
});


intent(`$(item* (.*))`, (p) => {
    if(p.item.value === 'health' || p.item.value === 'business' || p.item.value === 'technology' || p.item.value === 'entertainment' || p.item.value === 'sports' || p.item.value === 'general'){
        p.play({command: 'news_reader' , data: p.item.value});
        p.play(`Getting news from ${p.item.value} category`);
    }
    else{
        p.play(`Sorry! Cannot get news`);
    }
});

intent('Bye', p => {
    p.play('Have a good day');
});