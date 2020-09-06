const express=require("express");
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
var contactList=[
  {
      name:"Arpan",
      phone:"1111111111"
  },
  {
      name:"Tony Stark",
      phone:"1111121221"
  }

]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('asserts'));
app.listen(port,function(err)
{

    if(err)
    {
        console.log("not found");
    }
 console.log("express server is running");


});
app.get('/',function(req,res)
{
    console.log(__dirname);

return res.render('home',{title:"I am flying"});

});

app.get('/practice',function(req,res)
{

    Contact.find({},function(err,Contact)
    {
        if(err)
        {
            console.log('error find the contact');
        }
        return res.render('practice',{
            title:"practice",
            contact_list:Contact
        
        
        });

    });

});

app.post('/createcontact',function(req,res)
{
  // contactList.push(req.body);
  Contact.create({
      name:req.body.name,
      phone:req.body.phone

  },function(err,newContact)
  {
         if(err)
         {
             console.log('error in creating a contact');
             return ;
         }
         console.log('*******',newContact);
         return res.redirect('back');

  });

        
});
app.get('/delete/',function(req,res)
{
console.log(req.query);
/*
let phone=req.query.phone;
let index=contactList.findIndex(contact => contact.phone==phone);
if(index!=-1)
{
    contactList.splice(index,1);
}
*/
let id=req.query.id;

Contact.findByIdAndDelete(id,function(err)
{
    if(err)
    {
        console.log('deleting error');
        return;
    }
    return res.redirect('back');



});
return res.redirect('back');

});