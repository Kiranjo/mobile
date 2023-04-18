let express=require("express");
let app=express();
app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var port=process.env.PORT ||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

const {Client}=require("pg");
 const client=new Client({
    user: "postgres",
    password: "KiranJoshi@123",
    database: "postgres",
    port: 5432,
    host:"db.fzxawqyafzpldctxrqkb.supabase.co",
    ssl:{rejectUnauthorized:false},
});
client.connect(function(res,error){
    console.log(`Connected!!!`);
});

app.get("/mobiles",function(req,res,next){
    console.log("Inside/mobiles get api");
    let brand=req.query.brand;
    let ram=req.query.ram;
    let rom=req.query.rom;
    let os=req.query.os;

     let  query=`SELECT * FROM mobiles`;
  
    client.query(query,function(err,result){
    console.log(result.rows);
        if (err) {res.status(400).send(err);}
        if(brand){
            let brandArr=brand.split(",");
            result.rows=result.rows.filter((rs)=>brandArr.find((b1)=>b1==rs.brand));   
        }
        if(ram){
            let ramArr=ram.split(",");
            result.rows=result.rows.filter((rs)=>ramArr.find((b1)=>b1==rs.ram));   
        }
        if(rom){
            let romArr=rom.split(",");
            result.rows=result.rows.filter((rs)=>romArr.find((b1)=>b1==rs.rom));  
        }
        if(os){
            result.rows=result.rows.filter((rs)=>rs.os==os);   
        }
     
        res.send(result.rows);
       
       //client.end();
    });
});

app.get("/mobiles/:name",function(req,res,next){
    console.log("Inside/mobiles/name get api");
    let name=req.params.name;
    let values=[name]
    const query=`SELECT * FROM mobiles WHERE  name=$1`;
    client.query(query,values,function(err,result){
        if (err) {res.status(400).send(err);}
        res.send(result.rows);
       // client.end();
    });
});
app.get("/mobiles/brand/:brand",function(req,res,next){
    console.log("Inside/mobiles/brand get api");
    let brand=req.params.brand;
    let values=[brand]
    const query=`SELECT * FROM mobiles WHERE  brand=$1`;
    client.query(query,values,function(err,result){
        if (err) {res.status(400).send(err);}
        res.send(result.rows);
       // client.end();
    });
});
app.get("/mobiles/ram/:ram",function(req,res,next){
    console.log("Inside/mobiles/RAM get api");
    let ram=req.params.ram;
    let values=[ram]
    const query=`SELECT * FROM mobiles WHERE  ram=$1`;
    client.query(query,values,function(err,result){
        if (err) {res.status(400).send(err);}
        res.send(result.rows);
       // client.end();
    });
});
app.get("/mobiles/rom/:rom",function(req,res,next){
    console.log("Inside/mobiles/ROM get api");
    let ram=req.params.rom;
    let values=[rom]
    const query=`SELECT * FROM mobiles WHERE  rom=$1`;
    client.query(query,values,function(err,result){
        if (err) {res.status(400).send(err);}
        res.send(result.rows);
       // client.end();
    });
});
app.get("/mobiles/os/:os",function(req,res,next){
    console.log("Inside/mobiles/OS get api");
    let os=req.params.os;
    let values=[os]
    const query=`SELECT * FROM mobiles WHERE  os=$1`;
    client.query(query,values,function(err,result){
        if (err) {res.status(400).send(err);}
        res.send(result.rows);
       // client.end();
    });
});



app.delete("/mobiles/:name",function(req,res,next){
    console.log("Inside delete of mobiles");
    let name=req.params.name;
    let values=[name]
    const query=
    `DELETE FROM mobiles WHERE name=$1`;
    client.query(query,values,function(err,result){
        if(err){ res.status(400).send(err);}
        res.send(`${result.rowCount} deletion successful`);
    });
});

app.post("/mobiles",function(req,res,next){
    console.log("Inside post of mobiles");
    var values=Object.values(req.body);
    console.log(values);
    const query=`
 INSERT INTO mobiles (name,price,brand,ram,rom,os) VALUES ($1,$2,$3,$4,$5,$6)`;
    client.query(query,values,function(err,result){
        if(err){
            res.status(400).send(err);
        }
        console.log(result);
        res.send(`${result.rowCount} insertion successful`);
    });
});

app.put("/mobiles/:name",function(req,res,next){
    console.log("Inside put of mobiles");
    let name=req.params.name;
    let price=req.body.price;
    let brand=req.body.brand;
    let ram=req.body.ram;
    let rom=req.body.rom;
    let os=req.body.os;
    let values=[name,price,brand,ram,rom,os]
    const query=
    `UPDATE mobiles SET price=$2,brand=$3,ram=$4,rom=$5,os=$6 WHERE name=$1`;
    client.query(query,values,function(err,result){
        if(err){ res.status(400).send(err);}
        res.send(`${result.rowCount} updation successful`);
    });
});



