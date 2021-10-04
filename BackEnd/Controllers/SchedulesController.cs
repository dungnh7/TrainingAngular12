using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.IUnitOfWork;
using sd2376_workshop_backend.Extentions;
using sd2376_workshop_backend.ViewModels.Schedule;
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
    public class SchedulesController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Models.Schedule> repository;
        public DisplayOptions Options { get; }

        public SchedulesController(IUnitOfWork unitOfWork,IOptions<DisplayOptions> optionsAccessor)
        {
            this.unitOfWork = unitOfWork;
            repository = unitOfWork.Repository<Models.Schedule>();
            Options = optionsAccessor.Value;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public async Task<IActionResult> GetSchedulesAsync(int pageIndex)
        {
            var schdeulesQuery = await unitOfWork.Schedules.GetSchedulesAsync(pageIndex, Options.PageSize);
            var schdeules = schdeulesQuery.Select(x => new ScheduleViewModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Location = x.Location,
                User = x.User?.Name,
                TimeStart = x.TimeStart,
                TimeEnd = x.TimeEnd
            });

            int CountSchedule = unitOfWork.Schedules.GetTasksCount();

            Pagination<ScheduleViewModel> pages = new Pagination<ScheduleViewModel>()
            {
                Items = schdeules,
                PageIndex = pageIndex,
                PageSize = Options.PageSize,
                TotalRows = CountSchedule
            };

            return Ok(pages);
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var task = await repository.GetAsync(id);
            return Ok(task);
        }

        // POST api/<TasksController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ScheduleForm model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Models.Schedule schedule = new Models.Schedule
                    {
                        Title = model.Title,
                        Description = model.Description,
                        Location = model.Location,
                        UserId = model.UserId,
                        TimeStart = model.TimeStart,
                        TimeEnd = model.TimeEnd
                    };
                    var response = await repository.InsertAsync(schedule);
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
        public async Task<IActionResult> Put([FromBody] ScheduleForm model, int id)
        {
            if (id != model.Id)
                return BadRequest();
            else
            {
                try
                {
                    Models.Schedule schedule = new Models.Schedule
                    {
                        Id = model.Id,
                        Title = model.Title,
                        Description = model.Description,
                        Location = model.Location,
                        UserId = model.UserId,
                        TimeStart = model.TimeStart,
                        TimeEnd = model.TimeEnd
                    };
                    var response = repository.Update(schedule, id);
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
