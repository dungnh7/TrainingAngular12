using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.IUnitOfWork;
using sd2376_workshop_backend.Extentions;
using sd2376_workshop_backend.ViewModels.Schedule;
using sd2376_workshop_backend.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sd2376_workshop_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Models.User> repository;
        public DisplayOptions Options { get; }

        public UsersController(IUnitOfWork unitOfWork, IOptions<DisplayOptions> optionsAccessor)
        {
            this.unitOfWork = unitOfWork;
            repository = unitOfWork.Repository<Models.User>();
            Options = optionsAccessor.Value;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public async Task<IActionResult> GetUsersAsync(int pageIndex)
        {
            var UsersQuery = await unitOfWork.Users.GetUsersAsync(pageIndex, Options.PageSize);
            var Users = UsersQuery.Select(x => new UserViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Address=x.Address,
                Position=x.Position
            });

            int CountUser = unitOfWork.Users.GetUsersCount();

            Pagination<UserViewModel> pages = new Pagination<UserViewModel>()
            {
                Items = Users,
                PageIndex = pageIndex,
                PageSize = Options.PageSize,
                TotalRows = CountUser
            };

            return Ok(pages);
        }

        [HttpGet("userschedule")]
        public async Task<IActionResult> GetUserScheduleAsync(int userId)
        {
            var UsersQuery = await unitOfWork.Users.GetUserScheduleAsync(userId);
            var UserSchedules = UsersQuery.FirstOrDefault().Schedules.Select(x => new ScheduleViewModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Location = x.Location,
                TimeStart = x.TimeStart,
                TimeEnd = x.TimeEnd,
                User=x.User.Name
            });
            
            return Ok(UserSchedules);
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await repository.GetAsync(id);
            return Ok(user);
        }

        // POST api/<TasksController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserForm model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Models.User User = new Models.User
                    {
                        Name = model.Name,
                        Address = model.Address,
                        Position = model.Position,
                    };
                    var response = await repository.InsertAsync(User);
                    await unitOfWork.SaveChanges();

                    return StatusCode(201, response);
                }
                return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
            }
            catch (Exception ex)
            {
                return new JsonResult("Somethign Went wrong: " + ex.Message) { StatusCode = 500 };
            }            
        }

        // PUT api/<TasksController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] UserForm model, int id)
        {
            if (id != model.Id)
                return BadRequest();
            else
            {
                try
                {
                    Models.User User = new Models.User
                    {
                        Id= model.Id,
                        Name = model.Name,
                        Address = model.Address,
                        Position = model.Position,
                    };
                    var response = repository.Update(User, id);
                    await unitOfWork.SaveChanges();
                    return StatusCode(200, response);

                }
                catch (Exception ex)
                {
                    return new JsonResult("Somethign Went wrong: " + ex.Message) { StatusCode = 500 };
                }
            }

        }

        // DELETE api/<TasksController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await repository.Delete(id);
            await unitOfWork.SaveChanges();
            if (response)
            {
                return StatusCode(200, id);
            }
            return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
        }
    }
}
