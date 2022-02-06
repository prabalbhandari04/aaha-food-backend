    const Recipe = require('../models/RecipeModel');
    const mongoose = require("mongoose");
     
    const url = 'mongodb://127.0.0.1:27017/recipe_database';
     
    beforeAll(async () =>{
        await mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
        })
    })
     
    afterAll(async () => {
        await mongoose.connection.close();
    })
     
    describe('recipe',async () =>{
    it('recipe insert', ()=>{
        const reg = {
            'recipetitle':'puri',
            'recipeimg':'https://upload.wikimedia.org/wikipedia/commons/d/d8/Puri_A.jpg',
            'recipedesc':'puri mitho ho' ,
            'foodcategory':true ,
            'foodtype':"Breakfast",
            'reciperating': '5',
            'preptime': '6' 
        }
        return Recipe.create(reg).then((res)=>{
            expect(res.recipetitle).toEqual('puri')
        })
    })
         
     
        
        it('Update', async () => {
            const reg ={
                        'recipetitle': 'Haluwa'
                    } ;
            const status = await Recipe.updateOne({_id:Object('606c50cb53541a12280a60ae')},
            {$set : reg}) 
            
            expect(status.ok).toBe(1)
        });

   
     
     
        it('recipe retrieve', () => {
                return Recipe.findOne({_id:Object('606c50cb53541a12280a60ae')})
                expect(status.ok).toBe(1);
            });
     
        
        it('recipe del', async() => {
            return Recipe.deleteOne({_id:Object('606c50cb53541a12280a60ae')})
                expect(status.ok).toBe(1);
        })
    })