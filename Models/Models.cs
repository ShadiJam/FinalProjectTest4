using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
public class Employee : HasId {
    [Required]
    public int Id { get; set; }
    public string FName { get; set;}
    public string LName { get; set; }
    public string FullName { get; set; } 
    public string Department { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; } //create actual email property here
//     public int AdventId { get; set; }
    
    //create function that allows admin user to add employee
    // write logic for downloading file here

public class Advent : HasId {
    [Required]
    public int Id { get; set; }
    public string EventName { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    // public List<Advance> Advances { get; set; } = new List<Advance>();
    // public List<AdventLocation> Locations { get; set; } = new List<AdventLocation>();
    // public List<Employee> Employees { get; set; }
  
    // create function that allows admin user to create new event
    // write logic for downloading file here
}

// public class Advance : HasId {
//     [Required]
//     public int Id { get; set; }
//     public string AdvanceName { get; set; }
//     public bool isAssigned { get; set; } = false;
//     public bool isComplete { get; set; } = false;
//     public int EmployeeId { get; set; }
//     public List<Section> Sections { get; set; } = new List<Section>();
//     public DateTime dueDate { get; set; }
//     public int AdventId { get; set; }
//     public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
    // create function that allows admin user to approve/deny advance
    // create function that allows employee user to respond to an advance request
    // create function that allows admin user to create multiple versions of an advance and send certain versions to certain employees (departments)



// public class Section : HasId { 
//     [Required]
//     public int Id { get; set; }
//     public string SectionName { get; set; }
//     public string SectionDescription { get; set; }
//     public List<Category> Categories { get; set; } = new List<Category>();
//     public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();
    // create function that allows admin user to create section and include in a particular advance


// public class AdvanceSectionJoin : HasId {
//     [Required]
//     public int Id { get; set; }
//     public Advance Advance { get; set; }
//     public int AdvanceId {get;set;}
//     public Section Section { get; set; }
//     public int SectionId {get;set;}
// }

// public class Category : HasId {
//     [Required]
//     public int Id { get; set; }
//     public string CategoryName { get; set; }
//     public List<Option> Options { get; set; } = new List<Option>();
//     public int SectionId { get; set; }
// 

// public class Option : HasId {
//     [Required]
//     public int Id { get; set; }
//     public List<AdventLocation> Locations { get; set; }
//     public string OptionName { get; set; }
//     public int CategoryId { get; set; }
// }
    
    // create function that allows employee user to choose from options and post that to advance


// public class AdventLocation: HasId {
//     public int Id { get; set; }
//     public string formatted_address { get; set; }
//     public double lat { get; set; }
//     public double lng { get; set; }
//     public int AdventId {get;set;}
//     public int OptionId {get;set;}
// }

public partial class DB : IdentityDbContext<IdentityUser> {
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Advent> Advents { get; set; }
    // public DbSet<AdventLocation> Locations { get; set; }
    // public DbSet<Advance> Advances { get; set; }
    // public DbSet<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
    // public DbSet<Section> Sections { get; set; }
    // public DbSet<Category> Categories { get; set; }
    // public DbSet<Option> Options { get; set; }
// 
}

public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
        Repo<Employee>.Register(services, "Employees");

        // Repo<AdventLocation>.Register(services, "Locations");
            // d => d
            //     .Include(f => f.formatted_address)
            //     .ThenInclude(l => l.lat)
            //     .ThenInclude(l => l.lng)
            // );
        
        Repo<Advent>.Register(services, "Advents");
            // d => d
            //     .Include(e => e.Employees));
        //         .Include(a => a.Advances)
        //         .Include(r => r.ROs)
        //         );

        // Repo<Advance>.Register(services, "Advances",
        //     d => d
        //         .Include(s => s.Sections)
        //         .ThenInclude(c => c.Categories)
        //         .ThenInclude(o => o.Options));

        // Repo<Section>.Register(services, "Sections");
                
        // Repo<AdvanceSectionJoin>.Register(services, "AdvanceSectionJoins");
        // Repo<Category>.Register(services, "Categories",
        //     d => d 
        //         .Include(r => r.ROs));

        // Repo<Option>.Register(services, "Options");
    }
}
}
