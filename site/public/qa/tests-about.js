
suite('"About" Page Tests', function(){
    test('Page should contain contact link to contact page', function(){
        assert( $('a[href="/contact"]').length );
    });
});